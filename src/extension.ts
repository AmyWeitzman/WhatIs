// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// this method is called when the extension is activated
// the extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// check that the extension was successfully activated
	console.log('Extension "what-is" has been activated');

	// function to run when 'whatis' command is called (defined in package.json)
	let info = vscode.commands.registerCommand('what-is.whatis', (uri: vscode.Uri) => {

        // define type structure of file_info object 
        interface FileInfo {
            [file: string]: string;  // file_type: description
        }
    
        // object containing the supported file types and descriptions to display
        let file_info: FileInfo = {
            "package.json": "A package.json file contains metadata about a project, including the project's description, version, and license information. It is also used to manage the project's dependencies, making it easier to share projects with others.",
            "package-lock.json": "A package-lock.json file contains a screenshot of the versions of each dependency used in the project so that others who view the project will have the appropriate dependencies set up.",
            "README.md": "A README file gives a brief overview of a project for those who are unfamiliar with it. It often includes information about how to run the project, the project's features, and any updates.",
            ".gitignore": "A gitignore file tells Git which files in a project should be ignored (not tracked). This is useful for files, such as temporary files, auto-generated class files, and personal files, that should not be included when sharing the project with others.",
            "robots.txt": "A robots.txt file tells web crawlers which websites and resources are allowed to be accessed. This is important to ensure that a website is not overloaded with requests and private information is not accessed."
        };

        var message = "";                   // file description message to display to user 
        let path = uri.fsPath;              // get path of file that user right-clicked on
        for(const file in file_info) {      // find the file type in the file_info object
            if(path.endsWith(file)) {       // check if file type matches the "file" the user selected
                message = file_info[file];  // get the description for the file type
                break;                      // no need to check more file types, already found match
            } 
        } 
        vscode.window.showInformationMessage(message);  // display file type description to user
	});

	context.subscriptions.push(info);
}

// this method is called when the extension is deactivated
export function deactivate() {}
