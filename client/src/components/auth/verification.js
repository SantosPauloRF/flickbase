import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { accountVerify } from '../../store/actions/users'

import { Loader } from '../../utils/tools'

const AccountVerify = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useSearchParams()
    const token = search.get("t")

    useEffect(() => {
        if (token){
            dispatch(accountVerify(token))
            .unwrap()
            .finally(() =>{
                navigate("/")
            })
        }else{
            navigate("/")
        }

    }, [dispatch, navigate])

    return (
        <>
            <Loader />
        </>
    )
}

export default AccountVerify