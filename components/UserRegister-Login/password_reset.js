import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './style.module.css'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../authContext'
import 'react-toastify/dist/ReactToastify.css'

const host = process.env.NEXT_PUBLIC_HOST

const ChangePassword = () => {
    const context = useContext(AuthContext)
    const router = useRouter()
    const [password, setPassword] = React.useState('')
    const [cnfPassword, setCnfPassword] = React.useState('')
    const [passwordShown, setPasswordShown] = React.useState(false)
    console.log(router.query.slug)

    const handleSubmit = async (event) => {
        event.preventDefault()
        let body = { token: router.query.slug, password: password }
        // user input validation
        if (password.length == 0) {
            toast.warning('Please fill password', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            return
        } else if (password !== cnfPassword) {
            toast.warning('Passwords do not match', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            return
        }
        try {
            const response = await fetch(`${host}/user/forgetpassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials: 'include',
            })

            //check if request is successful
            // console.log(response.status)
            if (response.status === 200 || response.status === 201) {
                toast.success('Password reset successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                router.push('/userLogin')
            } else if (response.status === 409) {
                const data = await response.json()
                toast.error(data.message || 'Unable to reset password', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            } else {
                const data = await response.json()
                toast.error(data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            }
        } catch (err) {
            console.log(err)
            toast.error(
                'Password reset failed. Check your internet connection',
                {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                }
            )
        }
    }

    return (
        <div
            style={{
                position: 'relative',
                marginTop: '120px',
                overflow: 'hidden',
            }}
        >
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <img
                className={styles.island}
                alt="floating-island-iitp"
                src="/assets/floating-island.svg"
            />
            <img
                className={styles.clouds}
                alt="clouds"
                src="/assets/clouds.svg"
            />

            <div className={styles.form}>
                <motion.form
                    className={styles.mainForm}
                    initial={{ opacity: 0, x: '100%' }}
                    whileInView={{ opacity: 1, x: '0%' }}
                    transition={{ duration: 1 }}
                >
                    <h3>PASSWORD RESET</h3>
                    <hr />
                    <div className={styles.form_row}>
                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input
                                type={passwordShown ? 'text' : 'password'}
                                name="Password"
                                // placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <br />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="password">Confirm Password</label>
                            <br />
                            <input
                                type={passwordShown ? 'text' : 'password'}
                                name="Password"
                                // placeholder="Confirm Password"
                                onChange={(e) => setCnfPassword(e.target.value)}
                                required
                            />
                            <br />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <input
                            type="checkbox"
                            style={{
                                width: '20px',
                                height: '20px',
                                margin: '5px',
                            }}
                            onClick={() => {
                                setPasswordShown((prev) => !prev)
                            }}
                        />{' '}
                        Show Password
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <br />
                        <Link href="/userLogin" className={styles.forgotpass}>
                            Login here
                        </Link>
                    </div>
                    <motion.div
                        className={styles.buttonWrapper}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
                    </motion.div>
                </motion.form>
            </div>
        </div>
    )
}

export default ChangePassword
