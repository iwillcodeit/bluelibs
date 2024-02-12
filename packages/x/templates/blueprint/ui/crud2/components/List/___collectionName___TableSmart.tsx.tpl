import React, { Fragment } from "react";
import { {{ entityName }}, {{ collectionClass }} } from "@bundles/{{ bundleName }}/collections";
import { Routes } from "@bundles/{{ bundleName }}";
import { ColumnsType, ColumnType } from "antd/lib/table";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { AntTableSmart, Consumer } from "@redlibs/x-ui-admin";
import { QueryBodyType } from "@redlibs/x-ui";
import { Service } from "@redlibs/core";
import * as Ant from "antd";
import { features } from "../../config/features";
import { {{ entityName }}List } from "../../config/{{ entityName }}List";

export class {{ collectionName }}AntTableSmart extends AntTableSmart<{{ entityName }}> {
  collectionClass = {{ collectionClass }};

  getBody(): QueryBodyType<{{ entityName }}> {
    return {{ entityName }}List.getRequestBody();
  }

  getColumns(): ColumnsType<{{ entityName }}> {
    const list = this.container.get({{ entityName }}List);
    list.build();
    
    return [
      ...list.rest(),
      this.getActionsColumn(),
    ];
  }

  getActionsColumn(): ColumnType<{{ entityName }}> {
    return {
      title: this.i18n.t('generics.list_actions'),
      key: "actions",
      fixed: "right",
      width: 180,
      render: (_, model) => {
        return this.generateActions(model, {
          label: this.i18n.t('generics.list_actions'),
          icon: <DownOutlined />,
          items: this.getActionItems(),
        });
      },
    };
  }

  getSortMap() {
    return {{ entityName }}List.getSortMap();
  }

  getActionItems() {
    const actions = [];

    if (features.view) {
      actions.push({
        label: this.i18n.t('generics.view'),
        icon: <EyeOutlined />,
        action: (model) => {
          this.router.go(Routes.{{ generateRouteName "view" }}, {
            params: { id: model._id.toString() },
          })
        },
      })
    }
    
    if (features.edit) {
      actions.push({
        label: this.i18n.t('generics.edit'),
        icon: <EditOutlined />,
        action: (model) => {
          this.router.go(Routes.{{ generateRouteName "edit" }}, {
            params: { id: model._id.toString() },
          })
        },
      })
    }

    if (features.delete) {
      actions.push({
        label: this.i18n.t('generics.delete'),
        icon: <DeleteOutlined />,
        confirm: this.i18n.t('generics.ask_confirmation'),
        action: (model) => {
          this.collection.deleteOne(model._id).then(() => {
            this.load();
          })
        },
      })
    }

    return actions;
  }
}
