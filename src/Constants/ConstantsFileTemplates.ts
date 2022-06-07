import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { ConstantsFileExtensionsNoPeriod } from "./ConstantsFileExtensionsNoPeriod";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsFileTemplates {
    public static getFileTemplate(absoluteFilePath: AbsoluteFilePath): string {
        if(absoluteFilePath.isDirectory) {
            return "";
        }

        switch (absoluteFilePath.extensionNoPeriod) {
            case ConstantsFileExtensionsNoPeriod.C_SHARP_FILE_EXTENSION: {
                if(absoluteFilePath.filenameWithExtension.indexOf(ConstantsFileExtensionsNoPeriod.RAZOR__CODEBEHIND_FILE_EXTENSION)) {
                    return this.razorCodebehindFileTemplate(absoluteFilePath.filenameWithExtension, this.getNamespace(absoluteFilePath));
                }
                
                return this.csFileTemplate(absoluteFilePath.filenameWithExtension, this.getNamespace(absoluteFilePath));
            }
            case ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION: {
                return this.razorMarkupFileTemplate(absoluteFilePath.filenameWithExtension);
            }
            default:
                return "";
        }
    }

    // TODO: Read base namespace of .csproj in case user alters default
    private static getNamespace(absoluteFilePath: AbsoluteFilePath): string {
        let namespace = "";
        
        for (let i = absoluteFilePath.parentDirectories.length - 1; i > -1; i--) {
            let currentFileContainer = absoluteFilePath.parentDirectories[i];

            if (namespace) {
                namespace = `${currentFileContainer.filenameNoExtension}.${namespace}`;
            }
            else {
                namespace = currentFileContainer.filenameNoExtension;
            }

            if (currentFileContainer.extensionNoPeriod === ConstantsFileExtensionsNoPeriod.C_SHARP_PROJECT_FILE_EXTENSION) {
                break;
            }
        }

        return namespace;
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