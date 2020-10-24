import React, { Component } from 'react';
import RepLogs from "./RepLogs";
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

// this is Smart Component
export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ],
            numberOfHearts: 1
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(itemLabel, reps) {
        const repLogs = this.state.repLogs
        const newRep = {
            id: uuid(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        }

        /* NOTE
        *  setState is asynchronous
        *  React doesn't change state immediately
        *  Par exemple si deux parties du code appellent setState au même moment
        *  React va s'occuper du premier state change
        *  re-render React
        *  et ensuite s'occupe du second state change
        */

        /*  previous code:

        repLogs.push(newRep)
        this.setState({
            repLogs: repLogs
        })
        */

        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep]

            return {repLogs: newRepLogs}
        })

        /*
        * To keep it simple, just remember the rule:
        * if setting new state involves you using data on this.state,
        * pass a callback instead. Then, you'll know you're safe.
        * */
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        })
    }

    render() {
        {/*
        Spread Attributes:
            const { highlightedRowId, repLogs } = this.state;
            const { withHeart } = this.props;
        */}

        return <RepLogs
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onAddRepLog={this.handleAddRepLog}
            onHeartChange={this.handleHeartChange}
        />
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}
