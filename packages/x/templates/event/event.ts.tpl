import { Event } from "@redlibs/core";

{{# if hasInterfaceDefined }}
export interface {{ interfaceDefinition.name }} {
 {{ interfaceDefinition.toTypescript }}
}
{{/ if }}

export class {{ eventClass }} extends Event<{{ eventInterfaceName }}> {

}