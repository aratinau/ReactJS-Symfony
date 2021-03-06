import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* note
   identique à RepLogCreator à la difference qu'ici on utilise
   les handleXxxChange pour modifier les states des inputs
   alors que sur RepLogCreator on utilise React.createRef()
 */

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props)

        this.itemOptions = [
            { id: 'cat', text: 'Cat' },
            { id: 'fat_cat', text: 'Big Fat Cat' },
            { id: 'laptop', text: 'My Laptop' },
            { id: 'coffee_cup', text: 'Coffee Cup' },
        ];

        this.state = {
            selectedItemId: '',
            quantityValue: 0,
            quantityInputError: ''
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleSelectedItemChange = this.handleSelectedItemChange.bind(this)
        this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this)
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const { onAddRepLog } = this.props;
        const { selectedItemId, quantityValue } = this.state

        // Récupere le text par l'id d'un objet --> { id: 'coffee_cup', text: 'Coffee Cup' }
        const itemLabel = this.itemOptions.find((option) => {
            return option.id === selectedItemId
        }).text;

        if (quantityValue <= 0) {
            this.setState({
                quantityInputError: 'Please enter a value greater than 0'
            });
            return;
        }

        // onNewItemSubmit est une props
        onAddRepLog(
            itemLabel,
            quantityValue
        );

        this.setState({
            selectedItem: '',
            quantityValue: 0,
            quantityInputError: ''
        });
    }

    handleSelectedItemChange(event) {
        this.setState({
            selectedItemId: event.target.value
        })
    }

    handleQuantityInputChange(event) {
        this.setState({
            quantityValue: event.target.value
        })
    }

    render() {
        const { quantityInputError, selectedItemId, quantityValue } = this.state;
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required"
                           htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            /* replace name attribute by ref
                            name="item" */
                            value={selectedItemId}
                            onChange={this.handleSelectedItemChange}
                            required="required"
                            className="form-control">
                        <option value="">What did you
                            lift?
                        </option>
                        {this.itemOptions.map(option => {
                            return <option value={option.id} key={option.id}>{option.text}</option>
                        })}
                    </select>
                </div>
                {' '}
                <div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
                    <label className="sr-only control-label required"
                           htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input type="number" id="rep_log_reps"
                           value={quantityValue}
                           onChange={this.handleQuantityInputChange}
                           required="required"
                           placeholder="How many times?"
                           className="form-control"/>
                    {quantityInputError && <span className="help-block">{quantityInputError}</span>}
                </div>
                {' '}
                <button type="submit" className="btn btn-primary">I Lifted
                    it!
                </button>
            </form>
        )
    }
}

RepLogCreator.propTypes = {
    onAddRepLog: PropTypes.func.isRequired,
}
