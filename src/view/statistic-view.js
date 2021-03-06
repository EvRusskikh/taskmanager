import AbstractView from './abstract-view';

const createStatisticTemplate = () => (
  `<section class="statistic container">
    <div class="statistic__line">
      <div class="statistic__period">
        <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

        <div class="statistic-input-wrap">
          <input
            class="statistic__period-input"
            type="text"
            placeholder="01 Feb - 08 Feb"
          />
        </div>

        <p class="statistic__period-result">
          In total for the specified period
          <span class="statistic__task-found">0</span> tasks were fulfilled.
        </p>
      </div>
      <div class="statistic__line-graphic visually-hidden">
        <canvas class="statistic__days" width="550" height="150" style="width: 550px; height: 150px;"></canvas>
      </div>
    </div>

    <div class="statistic__circle">
      <div class="statistic__colors-wrap visually-hidden">
        <canvas class="statistic__colors" width="400" height="300" style="width: 400px; height: 300px;"></canvas>
      </div>
    </div>
  </section>`
);

export default class StatisticView extends AbstractView {
  get template() {
    return createStatisticTemplate();
  }
}
