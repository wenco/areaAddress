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
        var _self = this,
          _p = $('#' + opts.province),
          _c = $('#' + opts.city),
          _a = $('#' + opts.area),
          _pIndex = -1,
          _cIndex = -1;
        _self.CP = function() {
          var _html = '<option value="">请选择省/市</option>';
          for (var i = 0; i < opts.data.length; i++) {
            if (opts.p != undefined && opts.data[i].code == opts.p) {
              _pIndex = i;
              _html += '<option selected value="' + opts.data[i].code + '">' + opts.data[i].name + '</option>';
            } else {
              _html += '<option value="' + opts.data[i].code + '">' + opts.data[i].name + '</option>';
            }
          };

          if (opts.c != "undefined" && opts.c == "") {
            _c.hide();
          }
          if (opts.a != "undefined" && opts.a == "") {
            _a.hide();
          }

          _p.html(_html).on('change', function(index) {
            var _index = this.selectedIndex;
            _pIndex = _index == 0 ? -1 : _index - 1;
            _cIndex = -1;
            opts.a = opts.c = opts.a = '';
            var _flg = _index == 0 ? true : ('citys' in opts.data[_pIndex]);
            if (!_flg) {
              _c.html('<option value="">请选择市/县</option>').hide();
              _a.html('<option value="">请选择地区</option>').hide();
            } else {
              _c.show();
              _a.show();
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
          var _cLength = _pIndex > -1 ? (opts.data[_pIndex].citys === undefined ? 0 : opts.data[_pIndex].citys.length) : 0;
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
          _c.html(_html).on('change', function(index) {
            var _index = this.selectedIndex;
            _cIndex = _index == 0 ? -1 : _index - 1;
            var _flg = _index == 0 ? true : ('areas' in opts.data[_pIndex].citys[_cIndex]);
            if (!_flg) {
              _a.hide();
            } else {
              _a.html('<option value="">请选择地区</option>').show();
            }
            _self.CA(_flg);
          });
        }
        _self.CA = function(flg) {
          if (!flg) {
            return false;
          }
          var _html = '<option value="">请选择地区</option>';
          var _cLength = _cIndex > -1 ? (opts.data[_pIndex].citys[_cIndex].areas === undefined ? 0 : opts.data[_pIndex].citys[_cIndex].areas.length) : 0;
          if (_cLength > 0) {
            for (var i = 0; i < _cLength; i++) {
              if (opts.data[_pIndex].citys[_cIndex].areas[i].code == opts.a) {
                _html += '<option selected value="' + opts.data[_pIndex].citys[_cIndex].areas[i].code + '">' + opts.data[_pIndex].citys[_cIndex].areas[i].name + '</option>';
              } else {
                _html += '<option value="' + opts.data[_pIndex].citys[_cIndex].areas[i].code + '">' + opts.data[_pIndex].citys[_cIndex].areas[i].name + '</option>';
              }
            }
          }
          _a.html(_html);
        }
        _self.init = function() {
          _self.CP();
          _self.CC(true);
          _self.CA(true);
        }
        _self.init();
      });
    }

  });
})(jQuery);