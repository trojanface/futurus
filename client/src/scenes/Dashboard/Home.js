import React from 'react'
import Dashboard from './Dashboard'
import TitleBar from './TitleBar'

export default function Home() {
    return (
        <div>
<TitleBar />

            <div className="row no-gutters">





                <div className="col-md-3 text-center">
                    <Dashboard />
                </div>
                <div className="col-md-9 d-flex justify-content-center contentContainer fillVertSpace">
                    <div className="container ">
                    </div>
                </div>
            </div>
        </div>
    )
}
