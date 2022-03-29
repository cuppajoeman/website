import pprint

all_scales = ['{0:011b}'.format(i) for i in range(2**12)]
assert len(all_scales) == len(set(all_scales))

def scale_has_no_more_than_three_in_row(scale):
    for i in range(len(scale)):
        if '1' == scale[i] and '1' == scale[(i + 1) % len(scale)] and '1' == scale[(i + 2) % len(scale)]:
            return False
    return True

def scale_has_7_elements(scale):
    return scale.count('1') == 7

def scale_uses_zero(scale):
    return scale[0] == '1'

def twelve_slots(scale):
    return len(scale) == 12

def convert_scale_to_notation(scale):
    notation = []
    for i, c in enumerate(scale):
        if c == '1':
            notation.append(str(i))
    return notation

filters = (scale_has_no_more_than_three_in_row, scale_has_7_elements, scale_uses_zero, twelve_slots)
filtered_scales = filter( lambda x: all(f(x) for f in filters), all_scales )

notated_scales = list(map(convert_scale_to_notation, filtered_scales))

for scale in notated_scales:
    print(', '.join(scale))




