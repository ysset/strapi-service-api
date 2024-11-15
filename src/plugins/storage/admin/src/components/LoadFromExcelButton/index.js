import React, { useEffect, useState } from 'react'
import {  Button } from '@strapi/design-system';
import readXlsxFile from 'read-excel-file'

const LoadFromExcelButton = ({children, setDataState}) => {
    const fileUploadButton = () => {
        const input = document.getElementById('fileButton')
        input.click();
        input.onchange = () => {   
            readXlsxFile(input.files[0]).then((rows) => {
                const collums = rows.shift();
                const local = collums?.map(e => ({
                        name: e,
                        data: [],
                        visible: true,
                    }))
                local.forEach((e, i) => {
                    rows.forEach(row => {
                        e.data.push(row[i])
                    })
                });
                setDataState(local)
            })
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