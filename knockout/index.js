

function SeatReservation(name, initialMeal) {

    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function () {

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

    const sanduicheOptions = [{ mealName: "Sanduíche 1", price: 0 },
    { mealName: "Sanduíche 2", price: 34.95 },
    { mealName: "Sanduíche 3", price: 290 }];

    const premiumOptions = [{ mealName: "Premium 1", price: 0 },
    { mealName: "Premium 1", price: 34.95 },
    { mealName: "Premium 2", price: 290 }];

    const ultimateOptions = [{ mealName: "Ultimate 1", price: 0 },
    { mealName: "Ultimate 2", price: 34.95 },
    { mealName: "Ultimate 3", price: 300 }];

    self.availableFoods = ko.observableArray([]);

    self.selectedMeal = ko.observable();
    self.selectedFood = ko.observable();

    self.selectedMeal.subscribe(function (novoValor) {
        debugger;
        switch(novoValor.mealName){
            case "Sanduíche":
                self.availableFoods(sanduicheOptions);
                break;
            case "Premium":
                self.availableFoods(premiumOptions);
                break;
            case "Ultimate":
                self.availableFoods(ultimateOptions);
                break
            default:
                self.availableFoods(sanduicheOptions);
        }
    })

    self.seats = ko.observableArray([
        new SeatReservation("João", self.availableMeals()[0]),
        new SeatReservation("Maria", self.availableMeals()[1]),

    ]);

    self.addSeat = function () {
        self.seats.push(new SeatReservation(self.fullName(), self.selectedMeal()));
    }
    self.removeSeat = function (seat) {
        self.seats.remove(seat)
    }



    self.totalSurcharge = ko.computed(function () {
        var total = 0;

        for (var i = 0; i < self.seats().length; i++)
            total += self.seats()[i].meal().price;

        return total;
    });


}
ko.applyBindings(ReservationsViewModel, document.getElementById("oldSection"));

function Answer(text) {
    this.answerText = text;
    this.points = ko.observable(1)
}

function SurveyViewModel(question, pointsBudget, answers) {
    this.question = question
    this.pointsBudget = ko.observable(pointsBudget)
    this.answers = $.map(answers, function (text) {
        return new Answer(text);
    });
    this.save = function () { alert('To do') };

    this.pointsUsed = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < this.answers.length; i++)
            total += this.answers[i].points();

        return total;
    }, this);
}

ko.applyBindings(new SurveyViewModel("Que Fatores afetam suas escolhas de tecnologia?", 10, ['Funcionalidade, Compatibilidade, Acessibilidade',
    'Com que frequência é mencionado na hacker news?', 'Quantidade de gradientes e drop shadows na página inicial do projeto', 'Testemunhos 100% veridicos na pagina inicial do projeto'])
    , document.getElementById("questionarioSection"));

ko.bindingHandlers.visible = {
    update: function (element, valueAccessor) {
        var shouldDisplay = valueAccessor();

        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }
};

function Task(data) {
    this.title = ko.observable(data.title);
    this.isDone = ko.observable(data.isDone);

}
function TaskListViewModel() {
    //dados
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
    self.incompleteTasks = ko.computed(function () {
        return ko.utils.arrayFilter(self.tasks(), function (task) { return !task.isDone() });
    })
    //operacoes

    self.addTask = function () {

        self.tasks.push(new Task({ title: this.newTaskText() }));
        self.newTaskText("")
    }

    self.removeTask = function (task) { self.tasks.remove(task) }
}

ko.applyBindings(TaskListViewModel, document.getElementById('todo'));



