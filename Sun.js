/**
 * The Sun can {@link #rise} and {@link #set}.
 *
 *     @example
 *     var tpl = Ext.create('Template', "<div>{0}</div>");
 *     Sun.on({
 *         rise: function() { tpl.append(Ext.getBody(), ['Sun Rise']); },
 *         set:  function() { tpl.append(Ext.getBody(), ['Sun Set']);  }
 *     });
 *     Sun.rise();
 */
Ext.define("Sun", {

    alternateClassName: ['Star'],

    mixins: {
        observe: 'Ext.util.Observable'
    },

    singleton: true,

    /**
     * @cfg
     * Milliseconds between the sun setting and rising
     */
    millisecondsPerDay: 2000,

    constructor: function() {

        this.addEvents(
            /**
             * @event
             * Triggered when the sun rises.
             * @param {Date} Date the sun rises;
             */
            "rise",

            /**
             * @event
             * Triggered when the sun sets.
             */
            "set"
        );
    },

    /**
     * Fires the {@link #event-rise rise} event and schedules a sun set
     */
    rise: function() {
        this.fireEvent('rise', this.day);
        Ext.defer(this.set, this.millisecondsPerDay, this);
    },

    /**
     * Fires the {@link #event-set set} event and schedules a sun rise
     */
    set: function() {
        this.fireEvent('set');
        Ext.defer(this.rise, this.millisecondsPerDay, this);
    }
});


