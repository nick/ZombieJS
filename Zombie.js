/**
 * Hungry Zombie.
 *
 * {@img images/zombie.png}
 *
 *     @example
 *     var tpl = Ext.create('Template', "<div>{0}</div>");
 *
 *     var zombie = Ext.create('Zombie', {
 *         bloodlustMultiplier: 0.5
 *     });
 *     zombie.on({
 *         eatPumpkin: function() { tpl.append(Ext.getBody(), ['Eating Pumpkin!']) },
 *         eatHead: function() { tpl.append(Ext.getBody(), ['Eating Head!']) }
 *     });
 *
 *     Sun.millisecondsPerDay = 500;
 *     Sun.addListener('rise', function() { zombie.chooseLunch() }, zombie);
 *     Sun.rise();
 */
Ext.define("Zombie", {
    extend: "Ext.Base",

    alias: 'widget.zombie',

    mixins: {
        observe: 'Ext.util.Observable'
    },

    /**
     * @property
     * One property of Zombies is that they are rotting
     */
    rotting: true,

    config: {
        /**
         * @cfg (required)
         * The bloodlustMultiplier increases or decreases the chance a Zombie
         * will pick a human head to eat. Must be between 0 and 1.
         */
        bloodlustMultiplier: 0.5
    },

    constructor: function(cfg) {

        this.initConfig(cfg);

        this.addEvents(
            /**
             * @event
             * Fired when the Zombie chooses to eat a pumpkin
             */
            'eatPumpkin',

            /**
             * @event
             * Fired when the Zombie chooses to eat a **HUMAN HEAD**
             */
            'eatHead'
        );
    },

    /**
     * Causes the Zombie to decide between munching on a human head or a pumpkin
     */
    chooseLunch: function() {

        var braaaaaaaains = Math.round(Math.random() + this.getBloodlustMultiplier() - 0.5);

        if (braaaaaaaains) {
            this.fireEvent('eatHead');
        } else {
            this.fireEvent('eatPumpkin');
        }
    }
});
