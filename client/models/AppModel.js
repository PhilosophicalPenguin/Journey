window.AppModel = Backbone.Model.extend ({

    url: '/api/queryPositions/getPositions',

    ourHardCode : [ { position_name: 'Entertainment Lawyer', position_image: '../assets/entertainment-lawyer.jpg'}, 
                    { position_name: 'Product Manager',      position_image: '../assets/product-manager.jpg'     }, 
                    { position_name: 'Data Scientist',       position_image: '../assets/data-scientist.jpg'      }],

    parse: function(response) {
        this.set('availablePositions', []);

        var availablePositions = this.get('availablePositions');
        var posCollection = this.get('positionsCollection');

        var context = this;
        response.forEach(function(object) {
            posCollection.add(object);
            availablePositions.push(object.position_name);
        });

        return response;
    },

    initialize: function(params){
        this.set('positionsCollection', new PositionsCollection());

        this.fetch().then(this.positionsReceived.bind(this));

        this.listenTo(this.get('positionsCollection'), 'view', function(position) {
            var id = position.get('position_id');
            console.log('view heard by appmodel', id, position);
            clientRouter.navigate("journey/" + id, true);
        });
    },

    positionsReceived: function() {
      this.trigger('positionsReceived');
    }

});
