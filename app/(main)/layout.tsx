'use client';
import Layout from '../../layout/layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { init, selectIsLogin } from '../../redux/auth/authSlice';
interface AppLayoutProps {
    children: React.ReactNode;
}


export default function AppLayout({ children }: AppLayoutProps) {
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin)
    useEffect(() => {
        dispatch(init())
    })
    return (
        <Layout>{children}</Layout>
    )
}
