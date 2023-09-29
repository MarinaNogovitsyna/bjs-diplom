let exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout((response) => {
        if (response.success){
            location.reload();
        }
    });
}


ApiConnector.current(response => {
    if (response.success){
        ProfileWidget.showProfile(response.data)
    }
})

let rates = new RatesBoard();
function getExchangeRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        }
    })
}
getExchangeRates();
setInterval(getExchangeRates, 60000);

let transactions = new MoneyManager();
transactions.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            transactions.setMessage(response.success, 'Баланс успешно пополнен')
        }
        else {
            transactions.setMessage(response.success, response.error);
        }
    })
}

transactions.conversionMoneyCallback  = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            transactions.setMessage(response.success, 'Конвертация успешно выполнена')
        }
        else {
            transactions.setMessage(response.success, response.error);
        }
    })
}

transactions.sendMoneyCallback  = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            transactions.setMessage(response.success, 'Перевод успешно выполнен');
        }
        else {
            transactions.setMessage(response.success, response.error);
        }
    })
}

let favoritesWindow = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success){
        favoritesWindow.clearTable();
        favoritesWindow.fillTable(response.data);
        transactions.updateUsersList(response.data);
    }
})

favoritesWindow.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        debugger;
        if (response.success){
            favoritesWindow.clearTable();
            favoritesWindow.fillTable(response.data);
            transactions.updateUsersList(response.data);
            favoritesWindow.setMessage(response.success, 'Пользователь добавлен в избранное');
        } else {
            favoritesWindow.setMessage(response.success, response.error);
        }
    })
}

favoritesWindow.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success){
            favoritesWindow.clearTable();
            favoritesWindow.fillTable(response.data);
            transactions.updateUsersList(response.data);
            favoritesWindow.setMessage(response.success, 'Пользователь добавлен в избранное');
        } else {
            favoritesWindow.setMessage(response.success, response.error);
        }
    })
}

