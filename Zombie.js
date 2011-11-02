/**
 * Zombie!
 *
 * {@img zombie.png}
 *
 *     @example
 *     var tpl = Ext.create('Template', "<div>{0}</div>");
 *
 *     var zombie = Ext.create('Zjs.Zombie', {
 *         bloodlustMultiplier: 0.5
 *     });
 *
 *     Zjs.Sun.millisecondsPerDay = 500;
 *     Zjs.Sun.addListener('rise', function() {
 *         var lunch = zombie.chooseLunch();
 *         tpl.append(Ext.getBody(), ['Eating ' + lunch.food])
 *     }, zombie);
 *     Zjs.Sun.rise();
 */
Ext.define("Zjs.Zombie", {
    extend: "Ext.Base",

    alias: 'widget.zombie',

    /**
     * @property {Boolean} hungry  Zombies are always hungry
     */
    hungry: true,

    config: {
        /**
         * @cfg
         * Propability the Zombie will choose a head
         */
        bloodlustMultiplier: 0.5
    },

    constructor: function(cfg) {
        this.initConfig(cfg);
    },

    /**
     * Zombies can't walk fast
     * @return {Boolean} Always false
     */
    walkFast: function() {
        return false;
    },

    /**
     * Choose lunch for zombie
     * @return {Object}
     * @return {String} return.food Type of food
     * @return {Boolean} return.braaainsDesire Probability
     */
    chooseLunch: function() {

        var braaains = Math.round(Math.random() + this.getBloodlustMultiplier() - 0.5);

        return {
            food: Boolean(braaains) ? 'Head' : 'Pumpkin',
            braaainsDesire: braaains
        }
    },

    /**
     * @alias Zjs.Zombie#chooseLunch
     * @deprecated You should use {@link #chooseLunch}
     */
    chooseBreakfast: function() {
        this.chooseLunch();
    }
});
