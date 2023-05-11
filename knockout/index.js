
function SeatReservation(name, initialMeal) {
    debugger 
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function(){

        debugger 
        var price = self.meal().price;
        return "$" + (price || 0).toFixed(2);
    });
}

function ReservationsViewModel() {
    var self = this;

    this.firstName = ko.observable("Felipe");
    this.lastName = ko.observable("Gow"),

        this.fullName = ko.pureComputed(function () {
            return this.firstName() + " " + this.lastName()
        })

    this.capitalizeLastName = function () {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    }
    

    self.availableMeals = ko.observableArray([
        { mealName: "Sanduíche", price: 0 },
        { mealName: "Premium", price: 34.95 },
        { mealName: "Ultimate", price: 290 }
    ]);

    debugger

    self.selectedMeal = ko.observable();
    self.seats = ko.observableArray([
        new SeatReservation("João", self.availableMeals()[0]),
        new SeatReservation("Maria", self.availableMeals()[1]),

    ]);

    self.addSeat = function(){
        self.seats.push(new SeatReservation(self.fullName(), self.selectedMeal()));
    }
    self.removeSeat = function (seat) {
        self.seats.remove(seat)
    }

    self.totalSurcharge = ko.computed(function(){
        var total = 0;

        for(var i = 0; i < self.seats().length; i++)
            total += self.seats()[i].meal().price;
            
        return total;
    });

    
}

ko.applyBindings(ReservationsViewModel);