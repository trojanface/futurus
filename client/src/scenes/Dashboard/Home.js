import React from 'react'
import Dashboard from './Dashboard'

export default function Home() {
    return (
        <div className="row no-gutters">
            <div className="col-md-3 text-center">
                <Dashboard />
            </div>
            <div className="col-md-9 d-flex justify-content-center">
                <div className="container">
                </div>
            </div>
        </div>
    )
}
