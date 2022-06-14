import { IdeFile } from "../FileSystem/Files/IdeFile";
import { ConstantsFileExtensionsNoPeriod } from "./ConstantsFileExtensionsNoPeriod";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsFileTemplates {
    public static getFileTemplate(ideFile: IdeFile): string {
        if (ideFile.absoluteFilePath.isDirectory) {
            return "";
        }

        switch (ideFile.absoluteFilePath.extensionNoPeriod) {
            case ConstantsFileExtensionsNoPeriod.C_SHARP_FILE_EXTENSION: {
                if (ideFile.absoluteFilePath.filenameWithExtension.indexOf(ConstantsFileExtensionsNoPeriod.RAZOR__CODEBEHIND_FILE_EXTENSION) !== -1) {
                    return this.razorCodebehindFileTemplate(ideFile.absoluteFilePath.filenameWithExtension, this.getNamespace(ideFile));
                }

                return this.csFileTemplate(ideFile.absoluteFilePath.filenameWithExtension, this.getNamespace(ideFile));
            }
            case ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION: {
                return this.razorMarkupFileTemplate(ideFile.absoluteFilePath.filenameWithExtension);
            }
            default:
                return "";
        }
    }

    // TODO: Read base namespace of .csproj in case user alters default
    private static getNamespace(ideFile: IdeFile): string {
        return ideFile.namespace;
    }

    public static csFileTemplate(filenameWithExtension: string, namespace: string): string {
        return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ${namespace};

public class ${filenameWithExtension.replace(".cs", "")}
{
}
`;
    }

    public static razorCodebehindFileTemplate(filenameWithExtension: string, namespace: string): string {
        return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace ${namespace};

public partial class ${filenameWithExtension.replace(".razor", "").replace(".cs", "")} : ComponentBase
{
}
`;
    }

    public static razorMarkupFileTemplate(filenameWithExtension: string): string {
        return `<h3>${filenameWithExtension.replace(".razor", "")}</h3>

@code {
    
}
`;
    }
}