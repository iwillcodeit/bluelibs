import * as X from "@redlibs/x-bundle";
import { IResolverMap } from "@redlibs/graphql-bundle";

{{ collectionImportLine }}
{{ inputImportLine  }}
{{ serviceImportLine }}

export default {
  Mutation: {
    {{ mutationName }}: [
      {{# if checkLoggedIn }}
        X.CheckLoggedIn(),
      {{/ if }}
      {{# if permissionCheck }}
        X.CheckPermission(['ADMIN']),
      {{/ if }}
      {{# if checkCollectionExistence }}
        X.CheckDocumentExists({{ collectionClass }})
      {{/ if }}
      {{# if hasInput }}
        X.ToModel({{ inputClass }}),
        X.Validate(),
      {{/ if }}
      {{{ endOperation }}}
    ]
  }
} as IResolverMap;