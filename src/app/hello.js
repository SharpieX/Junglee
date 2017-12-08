var INTEGER_REGEXP = /^-?\d+$/;
angular
.module('app')
.component('app', {
	templateUrl: 'app/hello.html',
	controller: function ($http) {
		var vm = this;
		vm.hello = 'Find your artist below';
		vm.show = false;
		vm.openModal = function () {
			vm.show = true;
		};
		vm.hideModal = function () {
			vm.show = false;
		};
		vm.clearData = function () {
			vm.data = '';
		};
		vm.getData = function () {
			vm.show = false;
			var url = 'http://itunes.apple.com/search?term=' + this.name + '&limit=' + this.limit;
			$http({
				method: 'GET',
				url: url
			}).then(function successCallback(response) {
				vm.searched = vm.name;
				vm.name = '';
				vm.limit = '';
				vm.data = response.data;
				console.log(response);
			}, function errorCallback(response) {
				alert('No data found');
			});
		}
	}
})
.directive('username', function ($q, $timeout) {
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			var usernames = ['jack']

			ctrl.$validators.username = function (modelValue, viewValue) {

				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}
				if(usernames.indexOf(viewValue) === -1){
					return false;
				}
				return true;
			};
		}
	};
})

.directive('integer', function () {
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			ctrl.$validators.integer = function (modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}

				if (INTEGER_REGEXP.test(viewValue)) {
					return true;
				}

				return false;
			};
		}
	};
});
