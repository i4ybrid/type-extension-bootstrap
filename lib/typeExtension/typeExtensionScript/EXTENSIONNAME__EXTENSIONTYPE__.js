/**
 *   C H A N G E    L O G
 *
 *  JIRA #       Date        Who                       Description
 *  ----------   ----------  ------------------------  ---------------------------------------------------------------
 *  PSO-         {{mm/yy/yyyy}}  {{userEmail}}
 **/

var shouldSave = false;

function {{typeExtensionFunctionName}}(document, eventName, params) {
    //TODO : Execute additional functions here

    if (shouldSave) {
        Providers.getPersistenceProvider().save(document);
    }
}