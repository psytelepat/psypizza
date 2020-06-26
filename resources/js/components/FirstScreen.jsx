import React from 'react'

class FirstScreen extends React.Component {
    render() {
        return (
            <section className="first-screen">
                <canvas className="background"></canvas>
                <div className="logo" />
                <div className="welcome">
                    <h1>psypizza</h1>
                    <p>description</p>
                </div>
            </section>
        );
    }
}

export default FirstScreen;