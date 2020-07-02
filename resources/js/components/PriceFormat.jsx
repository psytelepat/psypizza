import React from 'react'
import { connect } from 'react-redux'

const currencySigns = {
    EUR: '€',
    USD: '$',
    RUB: '₽',
};

class PriceFormat extends React.Component {
    number_format(number, decimals, dec_point, thousands_sep) {
        // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfix by: Michael White (http://crestidg.com)
        var i, j, kw, kd, km;
        if( isNaN(decimals = Math.abs(decimals)) ){
            decimals = 2;
        }
        if( dec_point == undefined ){
            dec_point = ",";
        }
        if( thousands_sep == undefined ){
            thousands_sep = ".";
        }
        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
        if( (j = i.length) > 3 ){
            j = j % 3;
        } else{
            j = 0;
        }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        return km + kw + kd;
    }

    currencySign(currency) {
        return currencySigns[this.props.forceCurrency||this.props.currency];
    }

    render() {
        const { as, prepend, className, calc, price, exchange_rate } = this.props;

        return React.createElement(
            as,
            {className}, 
            [ prepend, this.currencySign(), ' ', this.number_format(calc ? Math.round(price * exchange_rate * 100) / 100 : price, 2, ',', ' ') ],
        );
    }
}

PriceFormat.defaultProps = {
    as: 'span'
};

const mapStateToProps = (state, props) => {
    return {
        currency: state.cart ? state.cart.data.currency : 'EUR',
        exchange_rate: state.cart ? state.cart.data.exchange_rate : 1,
    }
}

export default connect(mapStateToProps, null)(PriceFormat);