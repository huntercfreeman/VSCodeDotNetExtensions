/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsFileTemplates {
    public csFileTemplate(filename: string, namespace: string): string {
        return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ${namespace};

public class ${filename.replace(".cs", "")}
{
}
`;
    }

    public razorCodebehindFileTemplate(filename: string, namespace: string): string {
        return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace ${namespace};

public partial class ${filename.replace(".razor", "").replace(".cs", "")} : ComponentBase
{
}
`;
    }

    public razorMarkupFileTemplate(filename: string): string {
        return `<h3>${filename.replace(".razor", "")}</h3>
@code {
    
}
`;
    }
}