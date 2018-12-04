var app = angular.module('todolist', []);
app.controller('todosCtrl', function($scope) {
    $scope.master = undefined;
    $scope.todos = [
        { id: 1, title: '打電話給William', status: 1, edit: false}, //0: active, 1: done
        { id: 2, title: '做家事', status: 0, edit: false },
        { id: 3, title: '去銀行辦存摺', status: 0, edit: false },
        { id: 4, title: '遛狗', status: 0, edit: false }
    ];
    $scope.counter = $scope.todos.length;//使用變數counter記錄下一次新增todo項目的id。初始值為todo總數，每新增一次則加一

    //add a new item
    //angular.copy 用於複製資料，我們取得資料(字串)後放到newItem這個物件的title欄位中。假設這個字串有值(即不為undefined)，那就加入到todos這個陣列裡面，然後reset輸入框(意即還原成尚未打字前的樣子)。
    $scope.addItem = function(newItem){
        var newInputItem = angular.copy(newItem),
            newItem = { id: $scope.counter+1, title: newInputItem, status: 0};
        if(newItem.title != undefined){
            $scope.todos.push(newItem);
            $scope.counter++;
            $scope.reset();
        }
    };

    //after adding a new item, reset the input field
    $scope.reset = function(){
        $scope.newItem = angular.copy($scope.master);
    };

    //update an item
    //將edit設為true，開啟編輯狀態，並將目前的title值帶入輸入框中。
    $scope.edit = function(item){
        var thisItem = item;
        thisItem.edit = true;
        document.getElementById('edit-input-' + thisItem.id).value = thisItem.title;
    };

    //傳入此物件並取值，然後設定給title。記得將edit設為false，關閉編輯狀態。
    $scope.save = function(item, obj){
        var thisItem = item,
            thisInputValue = document.getElementById('edit-input-' + thisItem.id).value;

        if(thisInputValue != ''){
            thisItem.edit = false;
            thisItem.title = thisInputValue;
        }
    }

    //remove an item
    //傳入此物件，並搜尋目前todos陣列中這個物件，找到就移除它。
    $scope.remove = function(item){
        var thisItem = item,
            index = $scope.todos.indexOf(item);
        $scope.todos.splice(index, 1);       
    };

    //change item status - done or undo
    //將這個項目改為已完成的狀態
    $scope.done = function(item){
        var thisItem = item;
        thisItem.status = 1;
    };
    //將這個項目改為未完成的狀態
    $scope.undo = function(item){
        var thisItem = item;
        thisItem.status = 0;
    };

    //caculate number
    $scope.totalCount = function(){
        return $scope.todos.length;
    };
    $scope.activeCount = function(){
        var activeArray = [];
        angular.forEach($scope.todos, function(value, key) {
            if(value.status === 0){
                this.push(value);    
            }
        }, activeArray);
        return activeArray.length;
    };
    $scope.inactiveCount = function(){
        var inactiveArray = [];
        angular.forEach($scope.todos, function(value, key){
            if(value.status === 1){
                this.push(value);
            }
        }, inactiveArray);
        return inactiveArray.length;
    };
});