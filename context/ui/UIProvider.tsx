import { FC, PropsWithChildren, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE);

    const setIsAddingEntry = ( addingValue: boolean ) => {
        dispatch({ type: 'UI - Adding Entry', payload: addingValue });
    }
    const openSideMenu = () =>{
        dispatch({type: 'UI - Open Sidebar'});
    }
    const closeSideMenu= () =>{
        dispatch({ type: 'UI - Close Sidebar' });
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' });
    }

    return(
        <UIContext.Provider value={{
            ...state,

            //Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            startDragging,
            endDragging,

        }}>
            {children}
        </UIContext.Provider>
    )
}