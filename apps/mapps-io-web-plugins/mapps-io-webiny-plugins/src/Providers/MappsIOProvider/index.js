import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src";


function MappsIOProvider({children}){
    const InitProvider = React.useMemo(()=>mappsPlugins.byName("mapps-item-global-provider-init").component);
    const SingletonProvider =React.useMemo(()=>mappsPlugins.byName("mapps-item-global-provider-singleton"));
    return (<InitProvider>
            <>
                    {children}
                    {SingletonProvider.render()}
            </>      
    </InitProvider>)


}

export default MappsIOProvider;
