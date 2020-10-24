import React, { Component } from 'react';
import RepLogs from "./RepLogs";
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {deleteRepLog, getRepLogs, createRepLog} from '../api/rep_log_api';

// this is Smart Component
export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: ''
        };

        // empeche que si deux messages qui doivent d'afficher, le second ne disparait pas apres 1 seconde
        this.successMessageTimoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                })
            })
        ;
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimoutHandle)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
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

        this.setState({
            isSavingNewRepLog: true
        })

        const newState = {
            isSavingNewRepLog: false
        }

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog]

                    /* with babel 7:
                    return {
                        ...newState,
                        repLogs: newRepLogs,
                        newRepLogValidationErrorMessage: '',
                    }*/
                    return Object.assign({
                        repLogs: newRepLogs,
                        newRepLogValidationErrorMessage: '',
                    }, newState);
                })

                this.setSuccessMessage('Rep Log Saved!');
            })
            .catch(error => {
                error.response.json().then(errorsData => {
                    const errors = errorsData.errors;

                    // select the first key of an object
                    const firstError = errors[Object.keys(errors)[0]];

                    /* with babel 7:
                    this.setState({
                        ...newState,
                        newRepLogValidationErrorMessage: firstError
                    }); */
                    this.setState(Object.assign({
                        newRepLogValidationErrorMessage: firstError
                    }, newState));
                })
            })

        /*
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

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });

        clearTimeout(this.successMessageTimoutHandle)
        this.successMessageTimoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            })

            this.successMessageTimoutHandle = 0
        }, 3000)
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        })
    }

    handleDeleteRepLog(id) {
        // Change an item in the array
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }
                    return Object.assign({}, repLog, {isDeleting: true});
                })
            };
        });

        deleteRepLog(id)
            .then(() => {
                // remove the repo log without mutating state
                // filter returns a new array
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    };
                });
                /*  pourquoi setState avec callback:
                    Because the new state depends on the existing state, we should pass setState()
                    a callback to avoid a possible race condition with state being set at almost the same moment.
                 */

                this.setSuccessMessage('Item was Un-lifted!');
            });
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
            onDeleteRepLog={this.handleDeleteRepLog}
        />
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}
