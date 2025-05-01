import argparse

COMPONENTS_BASE_PATH = "src/components"


def create_file(path: str, content: str):
    with open(path, "w+") as f:
        f.write(content)


def create_component_content(component_name: str) -> str:
    component_full_name = component_name.lower().title() + "Component"
    component_props_var_name = component_full_name + "Props"
    content = f"""import React from 'react';
import {{Col, Row}} from 'antd';
    
type {component_props_var_name} = {{}};

const {component_full_name}: React.FC<{component_props_var_name}> = () => {{
    return <><Row><Col span={{24}}>{component_full_name} says hello!</Col></Row></>
}};

export default {component_full_name};
    """

    return content


def build_full_component_path(component_path: str, component_type: str):
    base_path = COMPONENTS_BASE_PATH if component_type == "component" else ""

    if component_path.endswith((".ts", ".tsx")):
        return f"{base_path}/{component_path}"
    else:
        return f"{base_path}/{component_path}/index.tsx"


def main(component_name: str, component_path: str, component_type: str):
    component_full_path = build_full_component_path(component_path, component_type)
    match component_type:
        case _:
            print(f"Create a component file at {component_full_path}")
            create_file(component_full_path, create_component_content(component_name))


if __name__ == "__main__":
    # Example usage: python scripts/scaffold.py -n goal -p budget/goal
    parser = argparse.ArgumentParser(
        "Simple React Component Scaffold",
        description="Create components and services TS files using CLI",
    )
    parser.add_argument("--name", "-n", dest="name", type=str, required=True)
    parser.add_argument("--path", "-p", dest="path", type=str, required=True)
    parser.add_argument(
        "--type", "-t", dest="component_type", default="component", type=str
    )

    args = parser.parse_args()

    main(args.name, args.path, args.component_type)
