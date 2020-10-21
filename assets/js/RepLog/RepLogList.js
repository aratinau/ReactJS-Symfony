import React, {Component} from 'react';
import PropTypes from 'prop-types';

// this is Dumb Component
export default function RepLogList(props) {
    const { highlightedRowId, onRowClick, repLogs } = props;

    return (
        <tbody>
            {repLogs.map((repLog) => (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'info' : ''}
                    onClick={() => onRowClick(repLog.id)}
                >
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>...</td>
                </tr>
            ))}
        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func,
    repLogs: PropTypes.array.isRequired,
}
