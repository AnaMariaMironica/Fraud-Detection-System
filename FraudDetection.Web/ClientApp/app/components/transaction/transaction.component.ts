﻿import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { Http } from '@angular/http';
import { Transaction } from './dto/Transaction';
import { TransactionStatus } from './dto/TransactionStatus';
import { TransactionType } from './dto/TransactionType';
import { CardType } from './dto/CardType';
import { CardVendor } from './dto/CardVendor';
import { Country } from './dto/Country';
import { ClientCountry } from './dto/ClientCountry';
import { Merchant } from './dto/Merchant';
import { TransactionAlertResponse } from './dto/transactionAlertResponse';
import { ButtonModule, GrowlModule, Message, CalendarModule, Calendar, SelectItem, Button, Dropdown } from 'primeng/primeng';

@Component({
    selector: 'transaction',
    template: require('./transaction.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})

export class TransactionComponent implements OnInit {
    public transactionStatuses: TransactionStatus[];
    public transactionTypes: TransactionType[];
    public cardTypes: CardType[];
    public cardVendors: CardVendor[];
	public transaction: Transaction;
    public countries: Country[];
    public merchants: Merchant[];
    public clientCountries: ClientCountry[];
	public alertResponse: TransactionAlertResponse;
    public msgs: Message[] = [];
    public submitted: boolean;
    public transactionform: FormGroup;
    public hasTransactionTypeError = false;
    public hasCardTypeError = false;
    public hasTransactionCurrencyError = false;
    public hasClientCountryError = false;
    public hasMerchantCountryError = false;
    public hasMerchantError = false;
    public selectedMerchantCountry: Country;
    http: Http;

    constructor(http: Http, private fb: FormBuilder) {
		this.transaction = new Transaction();
		this.alertResponse = new TransactionAlertResponse();
		this.alertResponse.status = "";
		this.msgs.push(
             {
                 severity: 'info',
                 summary: 'Info Message',
                 detail: "aaaaaaa AAAA"
             });

        this.http = http;

        http.get('/api/MasterData/GetTransactionTypes').subscribe(result => {
            this.transactionTypes = result.json();
        });
		http.get('/api/MasterData/GetCardTypes').subscribe(result => {
            this.cardTypes = result.json();
        });
        http.get('/api/MasterData/GetCardVendors').subscribe(result => {
            this.cardVendors = result.json();
        });
		http.get('/api/MasterData/GetCountries').subscribe(result => {
            this.countries = result.json();
        });
        http.get('/api/MasterData/GetClientCountries').subscribe(result => {
            this.clientCountries = result.json();
        });
    }

    ngOnInit() {
        this.transactionform = this.fb.group({
            'transactionType': new FormControl('', Validators.required),
            'cardType': new FormControl('', Validators.required),
            'amount': new FormControl('', Validators.required),
            'transactionTime': new FormControl('', Validators.required),
            'transactionDate': new FormControl('', Validators.required),
            'loginAtempts': new FormControl('', Validators.required),
            'clientCountry': new FormControl('', Validators.required),
            'lastTransactionDate': new FormControl('', Validators.required),
            'spentMoneyPerDay': new FormControl('', Validators.required),
            'spentMoneyPerMonth': new FormControl('', Validators.required),
            'cardNumber': new FormControl('', Validators.required),
            //'cardCvv': new FormControl('', Validators.required),
            'cardVendor': new FormControl('', Validators.required),
            'cardExpiryDate': new FormControl('', Validators.required),
            'merchantCountry': new FormControl('', Validators.required),
            'merchant': new FormControl('', Validators.required),
            'longitude': new FormControl('', Validators.required),
            'latitude': new FormControl('', Validators.required)
        });
    }

    onSelect() {
        this.http.get('/api/MasterData/GetMerchants?id=' + this.selectedMerchantCountry.countryId).subscribe(result => {
            this.merchants = result.json();
        });
    }

	verify() {
         this.http.post('/api/Transactions/VerifyAlert', this.transaction)
			.subscribe(result => {
              this.alertResponse = result.json();
        });
    }

    validateTransactionType(value) {
        if (value === '')
            this.hasTransactionTypeError = true;
        else
            this.hasTransactionTypeError = false;
    }

    validateCardType(value) {
        if (value === '')
            this.hasCardTypeError = true;
        else
            this.hasCardTypeError = false;
    }

    validateTransactionCurrencyError(value) {
        if (value === '')
            this.hasTransactionCurrencyError = true;
        else
            this.hasTransactionCurrencyError = false;
    }

    validateClientCountry(value) {
        if (value === '')
            this.hasClientCountryError = true;
        else
            this.hasClientCountryError = false;
    }

    validateMerchantCountry(value) {
        if (value === '')
            this.hasMerchantCountryError = true;
        else
            this.hasMerchantCountryError = false;

        this.selectedMerchantCountry.countryId = value;
        this.onSelect();
    }

    validateMerchant(value) {
        if (value === '')
            this.hasMerchantError = true;
        else
            this.hasMerchantError = false;
    }
}