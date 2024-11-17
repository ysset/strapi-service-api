import React, { useEffect, useState } from 'react'
import {  Button } from '@strapi/design-system';
import readXlsxFile from 'read-excel-file'
import { storageListRequest } from '../../api/storage.js'

const LoadFromExcelButton = ({children, setDataState}) => {
    const [rowsData, setRowsData] = useState(null);

    useEffect(() => {
        if(rowsData && rowsData.length) {
            const localRows = [...rowsData]
            //TODO реализовать возможность сжать таблицу
            // по каким параметрам сжимать таблицу пользователь выбирает сам
            // если в массиве строки совпадают значения с n кол-вом других строк
            // n кол-во строк превращается в 1 строку с указанием кол-ва сжатых в одно строк
            // при добавлении новой строки через админку строка сразу объединяется с други при их наличии
            const collums = localRows.shift();
            const local = collums?.map(e => ({
                    name: e,
                    data: [],
                    visible: true,
                }))
            local.forEach((e, i) => {
                localRows.forEach(row => {
                    e.data.push(row[i])
                })
            });
            setDataState(local)
            storageListRequest.saveNewList(rowsData)
        }
    }, [rowsData]);

    const fileUploadButton = () => {
        const input = document.getElementById('fileButton')

        input.click();
        input.onchange = () => {   
            if(input.files[0])
                readXlsxFile(input.files[0])
                    .then(setRowsData)
                    .catch(console.log)
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