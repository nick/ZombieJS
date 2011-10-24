/**
 * Wasteland class.
 *
 */
Ext.define('Wasteland', {

    singleton: true,

    init: function() {

        var dimensions = {
            height: 300,
            width: 500,
            expanded: false,
            fit: false
        };

        var configData = {
            parentId: 'AN-sObj-parentOl',
            ormma: false,
            scenes: [
                { id: 0, animationCount: 6,  dimensions: dimensions },
                { id: 1, animationCount: 9,  dimensions: dimensions },
                { id: 4, animationCount: 6,  dimensions: dimensions },
                { id: 3, animationCount: 10, dimensions: dimensions }
            ],
            clickEvents: []
        };

        this.animator = AN.Controller.setConfig(configData);
    }
});
