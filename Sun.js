/**
 * Sun!
 *
 *     @example
 *     var tpl = Ext.create('Template', "<div>{0}</div>");
 *     Zjs.Sun.on({
 *         rise: function(day) { tpl.append(Ext.getBody(), ['Sun Rise ' + day]); },
 *         set:  function() { tpl.append(Ext.getBody(), ['Sun Set']);  }
 *     });
 *     Zjs.Sun.rise();
 */
Ext.define("Zjs.Sun", {

    alternateClassName: ['Star'],

    mixins: {
        observe: 'Ext.util.Observable'
    },

    singleton: true,

    millisecondsPerDay: 2000,

    constructor: function() {

        this.date = Number(new Date());

        this.addEvents(
            /**
             * @event rise
             * Fired when the sun rises
             * @param {String} day  Day of the week
             */
            "rise",

            /**
             * @event set  Fires when the sun sets
             */
            "set"
        );
    },

    rise: function() {
        var date = new Date(this.date);
        this.fireEvent('rise', Ext.Date.format(date, 'l'));
        Ext.defer(this.set, this.millisecondsPerDay, this);
    },

    set: function() {
        this.fireEvent('set');
        this.date = this.date + (60 * 60 * 24 * 1000);
        Ext.defer(this.rise, this.millisecondsPerDay, this);
    }
});


