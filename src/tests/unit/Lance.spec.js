import Lance from '@/components/Lance';
import { mount } from '@vue/test-utils';

test('Não aceita lance com valor menor que zero', () => {
    const wrapper = mount(Lance); //Monta componente
    const input = wrapper.find('input'); //Localiza input dentro do componente
    input.setValue(-100); //Define valor invalido para input

    const lancesEmitidos = wrapper.emitted('novo-lance'); //Escuta evento novo-lance
    wrapper.trigger('submit'); //Ativa submição do formulário
    expect(lancesEmitidos).toBeUndefined(); //Espera que lancesEmitidos sejam undefined
});

test('Emite um lance quando o valor é maior que zero', () => {
    const wrapper = mount(Lance); //Monta componente
    const input = wrapper.find('input'); //Localiza input dentro do componente
    input.setValue(100); //Define valor válido para input

    wrapper.trigger('submit'); //Ativa submição do formulário
    const lancesEmitidos = wrapper.emitted('novo-lance'); //Escuta evento novo-lance
    expect(lancesEmitidos).toHaveLength(1); //Espera que lancesEmitidos existam (1 evento lá dentro)
});

test('O componente emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(100);
    wrapper.trigger('submit');

    const lancesEmitidos = wrapper.emitted('novo-lance');
    // [
    //     [100]
    // ]
    const lance = parseInt(lancesEmitidos[0][0]); // Traz valor = [100]
    expect(lance).toBe(100); // Espera que o valor seja [100]


});