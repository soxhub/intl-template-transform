let componentsToTranslate = [
  {
    "name": "@datatable.bulkDestroy",
    "arguments": [
      "@tooltip"
    ]
  },
  {
    "name": "@datatable.bulkEdits",
    "arguments": [
      "@namespaceLabel"
    ]
  },
  {
    "name": "@switcher.list-link",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "AppAdmin::Datafield::FormTemplates::FormTemplateField",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Assessments::AssessmentUserViewSwitcher",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "AuditableEntities::AuditableEntityViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "AuditableEntityRisks::AuditableEntityRiskInfoPanel",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Compliance::Issues::IssuesViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "ConfirmButton",
    "arguments": [
      "@title",
      "@confirmTitle"
    ]
  },
  {
    "name": "Container.LeftColumn",
    "arguments": [
      "@description",
      "@name"
    ]
  },
  {
    "name": "Controls::HeaderTitleContainer",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "Datatable.superuserExport",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatable.superuserImport",
    "arguments": [
      "@buttonLabel",
      "@label"
    ]
  },
  {
    "name": "Datatables::Actions::ActionPlanBulkDestroy",
    "arguments": [
      "@tooltip"
    ]
  },
  {
    "name": "Datatables::Actions::TestEnableDisableScopeButtons",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::Custom::DatatableButtonCustomAttributePermissionsExport",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonBulkDestroy",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonBulkDestroyHasmany",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonExportMenuItemSuperuser",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonFilterMenu",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonFilterMenuItem",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonGroupSelectedActions",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonGroupSelectedActionsHasmany",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableButtonMoreOptionsMenu",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableColumn",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Datatables::DatatableColumnSearch",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "DatatablesV2::DatatableButtonBulkUpdateDatepickerEnabled",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "DatatablesV2::DatatableButtonBulkUpdateMultiselect",
    "arguments": [
      "@namespaceLabel"
    ]
  },
  {
    "name": "DatatablesV2::DatatableButtonExportMenu",
    "arguments": [
      "@exportTitle"
    ]
  },
  {
    "name": "DatatablesV2::DatatableButtonFilterMenu",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "DatatablesV2::DatatableButtonFilterMenuItem",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "DatatablesV2::DatatableColumnFilter",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "DatatablesV2::DatatableColumnFilterTriggerContent",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "DatatablesV2::Filters::AvailableRisksFilterButtons",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Dropdown.Item",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "FileDownloadButton",
    "arguments": [
      "@title",
      "@text"
    ]
  },
  {
    "name": "Files::FileToolkit",
    "arguments": [
      "@dropzoneTitle"
    ]
  },
  {
    "name": "FormGroup.Datepicker",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "FormGroup.Input",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "FormGroup.Multiselect",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "FormGroup.Select",
    "arguments": [
      "@placeholder",
      "@emptyOptionPlaceholder"
    ]
  },
  {
    "name": "FormGroup.Textarea",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "FormGroup.multiselect",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "Forms::Custom::InlineCommonControl",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Forms::Custom::InlineUidTextfield",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Forms::InlineInputLabel",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Forms::InlineInputValueColorSwatch",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Forms::InlineInputValueStatic",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Forms::InlineInputValueStaticDocument",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Frame.Header",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Help::FieldInfo::InfoLine",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineBoolean",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineColorpicker",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineDatepicker",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineForm.multiselect",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineForm.textfield",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineMultiselect",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineSelect",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineTextarea",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineTextfield",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "InlineXSelect",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Issues::IssuesViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "KeyRiskIndicators::ViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "LabelComponent",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Layout::LoadaiProgress",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Layout::Tabs::TabHeader",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "LeftColumn.header",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Luna::Button",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Luna::Help",
    "arguments": [
      "@tooltip"
    ]
  },
  {
    "name": "Luna::Icon",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Luna::Input",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "Luna::Select",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "Luna::SelectDate",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "Luna::SelectDateRange",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "Luna::SelectMultiple",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "LunaButton",
    "arguments": [
      "@label",
      "@title"
    ]
  },
  {
    "name": "LunaCheckboxGroup",
    "arguments": [
      "@labelText"
    ]
  },
  {
    "name": "LunaForm::LunaFormGroup",
    "arguments": [
      "@name"
    ]
  },
  {
    "name": "LunaForm::LunaInlineDatepicker",
    "arguments": [
      "@inputAriaLabel"
    ]
  },
  {
    "name": "LunaForm::LunaInput",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "LunaForm::LunaLabel",
    "arguments": [
      "@name"
    ]
  },
  {
    "name": "LunaForm::LunaMultiselect",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "LunaForm::LunaSelect",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "LunaForm::LunaTextarea",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "LunaModal::LunaModalHeader",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "LunaRadioGroup",
    "arguments": [
      "@labelText"
    ]
  },
  {
    "name": "Opsaudits::AuditLogViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "Opsaudits::DatatableActions::OpsauditItemBulkDestroyButton",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Opsaudits::DatatableActions::OpsauditItemEnableDisableScopeButtons",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Opsaudits::OpsauditIssueViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "Opsaudits::OpsauditViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "Opsaudits::WorkstepViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "OwnerDashboard::Comments::CommentsList",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "OwnerDashboard::OverviewPanel::DoughnutChart",
    "arguments": [
      "@totalTitle"
    ]
  },
  {
    "name": "OwnerDashboard::OverviewPanel::Field",
    "arguments": [
      "@tooltipTitle"
    ]
  },
  {
    "name": "PowerSelect",
    "arguments": [
      "@placeholder",
      "@searchPlaceholder"
    ]
  },
  {
    "name": "PowerSelectMultiple",
    "arguments": [
      "@searchPlaceholder",
      "@placeholder"
    ]
  },
  {
    "name": "ResourcePlanner::ViewSwitcherButton",
    "arguments": [
      "@ariaLabel"
    ]
  },
  {
    "name": "Risks::RiskKriPanel",
    "arguments": [
      "@emptyRecordsMessage"
    ]
  },
  {
    "name": "Risks::RiskTemplateViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "Section.LabelText",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Select.TriggerButton",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Settings::LeftSubnav",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Settings::ModelProjectOptionToggle",
    "arguments": [
      "@description"
    ]
  },
  {
    "name": "Settings::SecureSettingListItemTextfield",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Settings::SettingListItemSelect",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Settings::SettingListItemTextarea",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Settings::SettingListItemTextfield",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Settings::SettingListItemToggle",
    "arguments": [
      "@label",
      "@tooltip"
    ]
  },
  {
    "name": "Settings::SiteSettingsListPanel",
    "arguments": [
      "@headerText"
    ]
  },
  {
    "name": "StaticComponent",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Superuser::ImportLink",
    "arguments": [
      "@linkLabel",
      "@buttonLabel",
      "@label"
    ]
  },
  {
    "name": "Surveys::Dropzones::FileRequestDropzoneOverlay",
    "arguments": [
      "@dropzoneTitle"
    ]
  },
  {
    "name": "Surveys::EmailSettings::LinkTemplate",
    "arguments": [
      "@description"
    ]
  },
  {
    "name": "Surveys::Wizard::StepsCircle",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Surveys::Wizard::TileSelect",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Surveys::WizardPanel",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Switcher.list-link",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Tasks::Dashboard::ByDueDate",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "Tasks::MultipleUserSelect",
    "arguments": [
      "@label",
      "@emptyText"
    ]
  },
  {
    "name": "Tasks::Primary::Buttons::ScheduleTaskButton",
    "arguments": [
      "@text"
    ]
  },
  {
    "name": "Textarea",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "Title.switcher",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "User::UserAdminViewSwitcher",
    "arguments": [
      "@activeLabel"
    ]
  },
  {
    "name": "User::UserIcon",
    "arguments": [
      "@tooltip"
    ]
  },
  {
    "name": "Wijmo::Toolbar::Menus::ButtonInnerMenuBorderDirectionButton",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "Wijmo::Toolbar::Menus::ButtonInnerMenuBorderStyleButton",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "ZendeskLink",
    "arguments": [
      "@text"
    ]
  },
  {
    "name": "container.headerBreadcrumb",
    "arguments": [
      "@headerText"
    ]
  },
  {
    "name": "datatable.superuserExport",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "datatable.superuserImport",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "dtLayout.datatable",
    "arguments": [
      "@namespaceLabel"
    ]
  },
  {
    "name": "formGroup.Select",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "formGroup.input",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "formGroup.multiselect",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "formGroup.select",
    "arguments": [
      "@placeholder",
      "@emptyOptionPlaceholder"
    ]
  },
  {
    "name": "formGroup.textarea",
    "arguments": [
      "@placeholder"
    ]
  },
  {
    "name": "inlineForm.textarea",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "inlineForm.textfield",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "layout.headerExtended",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "leftCol.header",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "leftColumn.header",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "m.Button",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "p.Option",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "panel.doughnutChart",
    "arguments": [
      "@totalTitle"
    ]
  },
  {
    "name": "switcher.list-item",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "switcher.list-link",
    "arguments": [
      "@title"
    ]
  },
  {
    "name": "title.switcher",
    "arguments": [
      "@label"
    ]
  },
  {
    "name": "toolkit.navButton",
    "arguments": [
      "@title"
    ]
  }
];

module.exports = function getArgumentsToTranslate(node) {
  let components = componentsToTranslate.filter(c => c.name === node.tag);
  if (components.length) {
    let argumentsToTranslate = node.attributes.filter(a => components.find(c => c.arguments.includes(a.name)));
    return argumentsToTranslate;
  }

  return [];
}