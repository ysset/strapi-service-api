import React, { useState } from 'react'
import { 
    Button,
  } from '@strapi/design-system';


const LoadFromExcelButton = ({children}) => {
    const [state, setState] = useState(null)

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = () =>{      
        setState({
            fileUploadState:document.getElementById('fileButton').value
                });
            }
        }

    return (
        <>
            <input id="fileButton" type="file" hidden/>
            <Button onClick={fileUploadButton}>
                {children}
            </Button>
        </>
    )
}

export default LoadFromExcelButton;