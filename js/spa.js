'use strict';

// send load to model for each route changes
function routes(model) {
    riot.route(function (hash) {
        model.trigger('load', hash.slice(2));
    });
}

// Model
function Wall() {
    var self = riot.observable(this),
            feed = [];

    self.add = function (pub) {
        feed.push(pub);
        self.trigger('add', pub);
    };

    self.edit = function (pub) {
        for (k in feed) {
            if (feed[k].id === pub.id) {
                feed[k] = pub;
            }
        }
        self.trigger('edit', pub);
    };

    self.remove = function (idPub) {
        for (k in feed) {
            if (feed[k].id === idPub) {
                pub = feed[k];
                delete feed[k];
            }
        }
        self.trigger('remove', pub);
    };

}

// Presenter
function WallPresenter(scope, model, viewOptions) {
    scope = $(scope);

    scope.on('click', '.edit', function (e) {
        console.log(getPublishingId(e.target));
    })

    function getPublishingElement(element) {
        return $(element).closest('[data-publish]');
    }

    function getPublishingId(element) {
        return getPublishingElement(element).data('publish');
    }
}

// bootstrap
(function ($) {

    // model
    var wall = new Wall();

    routes(wall);

    // Binds the Presenter
    WallPresenter($("#layout"), wall, {
        template: $('#task-template').html()
    });

})(jQuery);