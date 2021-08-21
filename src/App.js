import axios from "axios";
import { Fragment, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarCard from "./components/AvatarCard";
import Demo from "./components/Demo";
import ErrorPage from "./components/ErrorPage";
import ThemeChanger from "./components/ThemeChanger";
import config from "./config";
import moment from 'moment';
import { setLoading } from "./store/slices/loadingSlice";
import { setProfile } from "./store/slices/profileSlice";

function App() {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);

    const [error, setError] = useState(null);
    const [rateLimit, setRateLimit] = useState(null);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme])

    useEffect(() => {
        loadGitData();
    }, [])

    const loadGitData = () => {
        axios.get(`https://api.github.com/users/${config.githubUsername}`)
        .then(response => {

            let data = response.data;

            let profileData = {
                avatar: data.avatar_url,
                name: data.name,
                bio: data.bio,
            }

            dispatch(setProfile(profileData));
        })
        .catch(error => {
            console.error('Error:', error);
            
            try {
                setRateLimit({
                    remaining: error.response.headers['x-ratelimit-remaining'],
                    reset: moment(new Date(error.response.headers['x-ratelimit-reset'] * 1000)).fromNow(),
                })
                if (error.response.status === 403) {
                    setError(403);
                } else if (error.response.status === 404) {
                    setError(404);
                } else {
                    setError(500);
                }
            } catch (error) {
                setError(500);
            }
        })
        .finally(() => {
            dispatch(setLoading(false));
        });

    }

    return (
        <Fragment>
            <div className="fade-in h-screen">
                <div className="p-4 lg:p-10 bg-base-200">
                    {
                        error ? (
                            <ErrorPage
                                status={`${error}`}
                                title={(error === 404) ? 'The Github Username is Incorrect' : (
                                    error === 403 ? 'Too Many Request.' : `${error}`
                                )}
                                subTitle={
                                    (error === 404) ? (
                                        <p>
                                            Please provide correct github username in <code>src\config.js</code>
                                        </p>
                                    ) : (
                                        error === 403 ? (
                                            <p>
                                                Oh no, you hit the{' '}
                                                <a
                                                    href="https://developer.github.com/v3/rate_limit/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    rate limit
                                                </a>
                                                ! Try again later{rateLimit && ` ${rateLimit.reset}`}.
                                            </p>
                                        ) : `Something went wrong`
                                    )
                                }
                            />
                        ) : (

                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:bg-base-200 rounded-box">
                                <div className="row-span-3">
                                    <div className="grid grid-cols-1 gap-6">
                                        {
                                            !config.themeConfig.disableSwitch && (
                                                <ThemeChanger />
                                            )
                                        }
                                        <AvatarCard />
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="flex-row items-center space-x-4 card-body">
                                        <div>
                                            <div className="avatar">
                                                <div className="rounded-full w-14 h-14 shadow">
                                                    <img src="https://i.pravatar.cc/500?img=32" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="card-title">Janis Johnson</h2>
                                            <p className="text-base-content text-opacity-40">Accounts Agent</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="flex-row items-center space-x-4 card-body">
                                        <div className="flex-1">
                                            <h2 className="card-title">Meredith Mayer</h2>
                                            <p className="text-base-content text-opacity-40">Data Liaison</p>
                                        </div>
                                        <div className="flex-0">
                                            <button className="btn btn-sm">Follow</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="flex-row items-center space-x-4 card-body">
                                        <div className="flex-1">
                                            <h2 className="card-title text-primary">4,600</h2>
                                            <p className="text-base-content text-opacity-40">Page views</p>
                                        </div>
                                        <div className="flex space-x-2 flex-0">
                                            <button className="btn btn-sm btn-square">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button className="btn btn-sm btn-square">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="flex-row items-center space-x-4 card-body">
                                        <label className="flex-0">
                                            <input type="checkbox" defaultChecked="checked" className="toggle toggle-primary" />
                                        </label>
                                        <div className="flex-1">
                                            <h2 className="card-title">
                                                Enable Notifications
                                            </h2>
                                            <p className="text-base-content text-opacity-40">
                                                To get latest updates
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card col-span-1 row-span-3 shadow-lg xl:col-span-2 bg-base-100">
                                    <div className="card-body">
                                        <h2 className="my-4 text-4xl font-bold card-title">
                                            Top 10 UI Components
                                        </h2>
                                        <div className="mb-4 space-x-2 card-actions">
                                            <div className="badge badge-ghost">
                                                Colors
                                            </div>
                                            <div className="badge badge-ghost">
                                                UI Design
                                            </div>
                                            <div className="badge badge-ghost">
                                                Creativity
                                            </div>
                                        </div>
                                        <p>
                                            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.
                                        </p>
                                        <div className="justify-end space-x-2 card-actions">
                                            <button className="btn btn-primary">
                                                Login
                                            </button>
                                            <button className="btn">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="flex-row items-center space-x-4 card-body">
                                        <div className="flex-1">
                                            <h2 className="flex card-title">
                                                <button className="btn btn-ghost btn-sm btn-circle loading" />
                                                Downloading...
                                            </h2>
                                            <progress value={70} max={100} className="progress progress-secondary" />
                                        </div>
                                        <div className="flex-0">
                                            <button className="btn btn-circle">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="flex-row items-center space-x-4 card-body">
                                        <label className="cursor-pointer label">
                                            <input type="checkbox" defaultChecked="checked" className="checkbox checkbox-accent" />
                                            <span className="mx-4 label-text">
                                                Enable Autosave
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <ul className="menu row-span-3 p-4 shadow-lg bg-base-100 text-base-content text-opacity-40 rounded-box">
                                    <li className="menu-title">
                                        <span>Menu Title
                                        </span>
                                    </li>
                                    <li>
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 mr-2 stroke-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Item with icon
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 mr-2 stroke-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                            Item with icon
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 mr-2 stroke-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                            </svg>
                                            Item with icon
                                        </a>
                                    </li>
                                </ul>
                                <div className="alert col-span-1 xl:col-span-2 bg-base-100">
                                    <div className="flex-1">
                                        <label className="mx-3">
                                            Lorem ipsum dolor sit amet, consectetur adip!
                                        </label>
                                    </div>
                                    <div className="flex-none">
                                        <button className="btn btn-sm btn-ghost mr-2">
                                            Cancel
                                        </button>
                                        <button className="btn btn-sm btn-primary">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                                <div className="alert col-span-1 xl:col-span-2 alert-info">
                                    <div className="flex-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <label>
                                            Lorem ipsum dolor sit amet, consectetur adip!
                                        </label>
                                    </div>
                                </div>
                                <div className="alert col-span-1 xl:col-span-2 alert-success">
                                    <div className="flex-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                        </svg>
                                        <label>
                                            Lorem ipsum dolor sit amet, consectetur adip!
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default memo(App);
