# The Zombie Library

The Zombie library consists of three classes, {@link Sun},
{@link Wasteland} and {@link Zombie}.

The Sun fires two events: rise and set. Zombies know it's time to eat
when the Sun fires a {@link Sun#set set} event. When the sun sets,
a Zombie needs to choose whether to eat a human head or a pumpkin.
A Zombie can be configured with a `bloodlust` modifier that can
swing favor between heads or pumpkins.

Here's an example of the Zombie in action:

    @example
    Wasteland.init();
    Sun.millisecondsPerDay = 11000;

    var zombie = Ext.create('Zombie', {
        bloodlustMultiplier: 0.5
    });

    zombie.on({
        eatPumpkin: function() {
            Wasteland.animator.startSceneByID(1);
        },
        eatHead: function() {
            Wasteland.animator.startSceneByID(3);
        }
    });

    Sun.on({
        rise: function() {
            zombie.chooseLunch();
        },
        set: function() {
            Wasteland.animator.startSceneByID(0);
        }
    });

    Sun.set();


