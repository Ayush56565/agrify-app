import React from "react"
const Init = (navigation, dispatch) => {
    // const { navigation, dispatch } = props

    React.useEffect(() => {
        dispatch(appInitService.initApp(navigation))
    }, [dispatch, navigation])

    return null
}

export default Init