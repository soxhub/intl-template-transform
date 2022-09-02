const testCase = require('../helpers/test-case');

describe('Helper Arguments', function () {
  testCase({
    name: 'Helper Arguments',
    input: `
    <span class="card-media-header capitalize">
      {{audit.action}} {{listController.singularLabel}}
    </span>
    <span>
      with &nbsp;{{clean-audit-field
        field=audit.field
      }}&nbsp;{{convert-audit-value
        field=audit.field
        idValue=audit.toValue
      }}&nbsp;{{zendesk-link
        field=audit.field
        idValue=audit.toValue
      }}
    </span>
    `,
    output: `
    <span class="card-media-header capitalize">
      {{audit.action}} {{listController.singularLabel}}
    </span>
    <span>
      {{format-message "with &nbsp;" htmlSafe=true}}{{clean-audit-field
        field=audit.field
      }}&nbsp;{{convert-audit-value
        field=audit.field
        idValue=audit.toValue
      }}&nbsp;{{zendesk-link
        field=audit.field
        idValue=audit.toValue
      }}
    </span>
    `,
  });
});
