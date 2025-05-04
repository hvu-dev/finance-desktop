import argparse

COMPONENTS_BASE_PATH = "src/components"

BASE_MAIN_PATH = "electron/main/database/"
SERVICES_BASE_PATH = f"{BASE_MAIN_PATH}services"
ADAPTERS_BASE_PATH = f"{BASE_MAIN_PATH}adapters"


def create_file(path: str, content: str):
    with open(path, "w+") as f:
        f.write(content)


def create_component_content(component_name: str) -> str:
    component_full_name = component_name.title() + "Component"
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


def create_adapter_content(adapter_name: str) -> str:
    adapter_name_title = adapter_name.title()
    adapter_full_name = adapter_name_title + "Adapter"
    adapter_db_row = f"{adapter_name_title}DBRow"
    content = f"""
import {{ {adapter_name_title}, {adapter_db_row} }} from '../dtos/{adapter_name.lower()}';
import {{ Adapter }} from './base';

export class {adapter_full_name} implements Adapter<{adapter_db_row}, {adapter_name_title}> {{
    adapt(data: {adapter_db_row}): {adapter_name_title} {{ return; }}

    adaptMultiple(data: {adapter_db_row}[]): {adapter_name_title}[] {{ return; }}
}}
"""
    return content


def create_service_content(service_name: str) -> str:
    service_full_name = service_name.title() + "Service"
    content = f"""import {{ Adapter }} from '../adapters/base';
import {{ DatabaseRepository }} from '../repository/database';

export class {service_full_name} {{
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<{service_name.title()}DBRow, {service_name.title()}>
    ) {{}}
}}
"""
    return content


def build_full_component_path(component_path: str, component_type: str):
    match component_type:
        case "service":
            base_path = SERVICES_BASE_PATH
        case "adapter":
            base_path = ADAPTERS_BASE_PATH
        case _:
            base_path = COMPONENTS_BASE_PATH

    if component_path.endswith((".ts", ".tsx")):
        return f"{base_path}/{component_path}"
    else:
        return f"{base_path}/{component_path}/index.tsx"


def main(component_name: str, component_path: str, component_type: str):
    component_full_path = build_full_component_path(component_path, component_type)
    print(f"Create a {component_type} file at {component_full_path}")

    match component_type:
        case "service":
            create_file(component_full_path, create_service_content(component_name))
        case "adapter":
            create_file(component_full_path, create_adapter_content(component_name))
        case _:
            create_file(component_full_path, create_component_content(component_name))


if __name__ == "__main__":
    # Example usage: python scripts/scaffold.py -n goal -p budget/goal -t service
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
