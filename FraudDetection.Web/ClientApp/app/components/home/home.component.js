"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import { Chart } from 'chart.js';
var HomeComponent = (function () {
    function HomeComponent(http) {
        var _this = this;
        this.isDataAvailable = false;
        this.statisticPerMonth = new MonthStatistics(300, 50, 100);
        this.dashboardStatistics = new DashboardStatistics();
        this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;
        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(function (result) {
            _this.statisticPerMonth = result.json();
        });
        this.data = {
            labels: ['Romania', 'Germany', 'France'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        template: require('./home.component.html'),
        styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css'),
            require('../node_modules/primeng/resources/primeng.min.css'),
            require('../node_modules/primeng/resources/themes/omega/theme.css'),
            require('../node_modules/font-awesome/css/font-awesome.min.css')
        ]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], HomeComponent);
exports.HomeComponent = HomeComponent;
var MonthStatistics = (function () {
    function MonthStatistics(numberOfDetectedFraudsPerCurrentMonth, numberOfSuccessfullyProcessedTransactions, numberOfIncorrectlyDetectedFrauds) {
        this.numberOfDetectedFraudsPerCurrentMonth = numberOfDetectedFraudsPerCurrentMonth;
        this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
        this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
    }
    return MonthStatistics;
}());
exports.MonthStatistics = MonthStatistics;
var StatisticsPerCountry = (function () {
    function StatisticsPerCountry(numberOfDetectedFraudsPerMonth, numberOfSuccessfullyProcessedTransactions, numberOfIncorrectlyDetectedFrauds, country) {
        this.numberOfDetectedFraudsPerMonth = numberOfDetectedFraudsPerMonth;
        this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
        this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
        this.country = country;
    }
    return StatisticsPerCountry;
}());
exports.StatisticsPerCountry = StatisticsPerCountry;
var DashboardStatistics = (function () {
    function DashboardStatistics() {
    }
    return DashboardStatistics;
}());
exports.DashboardStatistics = DashboardStatistics;
//# sourceMappingURL=home.component.js.map