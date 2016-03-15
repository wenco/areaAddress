(function($) {
  $.fn.extend({
    areaAddress: function(options) {
      var defaults = {
        province: 'province',
        city: 'city',
        area: 'area',
        data: _dataList.provinces
      };
      var opts = $.extend(defaults, options);
      return this.each(function() {
        var _self = this;
        var _pIndex = _cIndex = -1;
        _self.CP = function() {
          var _html = '<option value="">请选择省/市</option>';
          for (var i = 0; i < opts.data.length; i++) {
            if (opts.data[i].code == opts.p) {
              _pIndex = i;
              _html += '<option selected value="' + opts.data[i].code + '">' + opts.data[i].name + '</option>';
            } else {
              _html += '<option value="' + opts.data[i].code + '">' + opts.data[i].name + '</option>';
            }
          };
          $('#' + opts.province).html(_html).on('change', function(index) {
            var _index = this.selectedIndex;
            _pIndex = _index == 0 ? -1 : _index - 1;
            _cIndex = -1;
            opts.a = opts.c = opts.a = '';
            var _flg = _index == 0 ? true : ('citys' in opts.data[_pIndex]);
            if (!_flg) {
              $('#' + opts.city).html('<option value="">请选择市/县</option>').hide();
              $('#' + opts.area).html('<option value="">请选择地区</option>').hide();
            } else {
              $('#' + opts.city).show();
              $('#' + opts.area).show();
            }
            _self.CC(_flg);            
            _self.CA(_flg);
          });
        }
        _self.CC = function(flg) {
          if (!flg) {
            return false;
          }
          var _html = '<option value="">请选择市/县</option>';
          var _cLength = _pIndex > -1 ? (opts.data[_pIndex].citys===undefined?0:opts.data[_pIndex].citys.length) : 0;
          if (_cLength > 0) {
            for (var i = 0; i < _cLength; i++) {
              if (opts.data[_pIndex].citys[i].code == opts.c) {
                _cIndex = i;
                _html += '<option selected value="' + opts.data[_pIndex].citys[i].code + '">' + opts.data[_pIndex].citys[i].name + '</option>';
              } else {
                _html += '<option value="' + opts.data[_pIndex].citys[i].code + '">' + opts.data[_pIndex].citys[i].name + '</option>';
              }
            }
          }
          $('#' + opts.city).html(_html).on('change', function(index) {
            var _index = this.selectedIndex;
            _cIndex = _index == 0 ? -1 : _index - 1;
            var _flg = _index == 0 ? true : ('areas' in opts.data[_pIndex].citys[_cIndex]);
            if (!_flg) {
              $('#' + opts.area).hide();
            } else {
              $('#' + opts.area).html('<option value="">请选择地区</option>').show();
            }
            _self.CA(_flg);
          });
        }
        _self.CA = function(flg) {
          if (!flg) {
            return false;
          }
          var _html = '<option value="">请选择地区</option>';
          var _cLength = _cIndex > -1 ? (opts.data[_pIndex].citys[_cIndex].areas===undefined?0:opts.data[_pIndex].citys[_cIndex].areas.length) : 0;
          if (_cLength > 0) {
            for (var i = 0; i < _cLength; i++) {
              if (opts.data[_pIndex].citys[_cIndex].areas[i].code == opts.a) {
                _html += '<option selected value="' + opts.data[_pIndex].citys[_cIndex].areas[i].code + '">' + opts.data[_pIndex].citys[_cIndex].areas[i].name + '</option>';
              } else {
                _html += '<option value="' + opts.data[_pIndex].citys[_cIndex].areas[i].code + '">' + opts.data[_pIndex].citys[_cIndex].areas[i].name + '</option>';
              }
            }
          }
          $('#' + opts.area).html(_html);
        }
        _self.init = function() {
          _self.CP();
          if (opts.c != "undefined" && opts.c == "") {
            _self.CC(false);
            _self.CA(false);
            $('#' + opts.city).hide();
            $('#' + opts.area).hide();
          } else if (opts.a != "undefined" && opts.a == "") {
            _self.CA(false);
            $('#' + opts.area).hide();
          } else {
            _self.CC(true);
            _self.CA(true);
          }
        }
        _self.init();
      });
    }

  });
})(jQuery);
