# The Zombie Library

The Zombie library consists of three classes:

 - {@link Zjs.Zombie}
 - {@link Zjs.Sun}
 - {@link Zjs.Wasteland}

The Sun fires two events: {@link Zjs.Sun#event-rise rise} and
{@link Zjs.Sun#event-set set}. Zombies know it's time to eat when the
Sun fires a {@link Zjs.Sun#set set} event. When the sun sets, a
Zombie needs to choose whether to eat a human head or a pumpkin.
A Zombie can be configured with a /bin/bash: bloodlust: command not found modifier that can
swing favor between heads or pumpkins.

Here's an example of the Zombie in action:

    @example
    Zjs.Wasteland.init();
    Zjs.Sun.millisecondsPerDay = 11000;

    var zombie = Ext.create('Zjs.Zombie', {
        bloodlustMultiplier: 0.5
    });

    Zjs.Sun.on({
        rise: function() {
            var lunch = zombie.chooseLunch();
            if (lunch.food == 'Pumpkin') {
                Zjs.Wasteland.animator.startSceneByID(1);
            } else {
                Zjs.Wasteland.animator.startSceneByID(3);
            }
        },
        set: function() {
            Zjs.Wasteland.animator.startSceneByID(0);
        }
    });

    Zjs.Sun.set();


