import iniparse from './iniparser';

var INI = {
	//parse: iniparse,
	stringify: function(object) {
		var inified = '';
		for (var key in object) {
			if (!object.hasOwnProperty(key))
				continue;
			var section = object[key];
			inified += `\n[${key}]`;
			for (var name in section) {
				if (!section.hasOwnProperty(name))
					continue;
				var item = section[name];
				if (item instanceof Array)
					inified += item.map(o=>`\n[${name}]=${o}`).join('');
				else if (typeof item === 'object') {
					for (var objKey in item) {
						if (!item.hasOwnProperty(objKey))
							continue;
						inified += `\n${name}[${objKey}]=${item[objKey]}`;
					}
				}
				else
					inified += `\n${name}=${item}`;
			}
			inified += '\n';
		}
		return inified.slice(1, -1);
	}
};

export default INI;
