import React from 'react';
import Modal from 'hen';



export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
              return action(dispatch, getState);
            }

            const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
            if (!promise) {
              return next({...action,loading :false});
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST, loading:true});

            const actionPromise = promise(client);
            actionPromise.then(
                (result) => {
                    console.log(result)
                    if (result.data && result.data.status === 1) {
                         return next({...rest, result, type: SUCCESS, loading:false})
                    }
                    if(result.data.code === "TIMEOUT_SESSION"){
                        return next({...rest, result, type: 'auth/TIMEOUT_SESSION', loading:false})
                    }
                    return next({...rest, result, type: FAILURE, loading:false})
                },
                (error) => next({...rest, error, type: FAILURE, loading:false})
            ).catch((error) => {
                console.error('MIDDLEWARE ERROR:', error);
                
                next({...rest, error, type: FAILURE, loading:false});
            });

            return actionPromise;
        };
    };
}
