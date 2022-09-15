<!-- <template>
  <div class="home-container">
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">Configuration</div>
      <el-form
        ref="configForm"
        hide-required-asterisk
        size="small"
        label-position="top"
        :model="connection"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="host" label="Host">
              <input v-model="connection.host" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="port" label="Port">
              <input
                v-model.number="connection.port"
                type="number"
                placeholder="8083/8084"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="endpoint" label="Mountpoint">
              <input v-model="connection.endpoint" placeholder="/mqtt" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="clientId" label="Client ID">
              <input v-model="connection.clientId" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="username" label="Username">
              <input v-model="connection.username" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="Password">
              <input v-model="connection.password" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <button
              type="success"
              size="small"
              class="conn-btn"
              style="margin-right: 20px"
              :disabled="client.connected"
              @click="createConnection"
            >
              {{ client.connected ? "Connected" : "Connect" }}
            </button>

            <button
              v-if="client.connected"
              type="danger"
              size="small"
              class="conn-btn"
              @click="destroyConnection"
            >
              Disconnect
            </button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">Subscribe</div>
      <el-form
        ref="subscription"
        hide-required-asterisk
        size="small"
        label-position="top"
        :model="subscription"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <input v-model="subscription.topic" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="subscription.qos">
                <el-option
                  v-for="(item, index) in qosList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <button
              :disabled="!client.connected"
              type="success"
              size="small"
              class="subscribe-btn"
              @click="doSubscribe"
            >
              {{ subscribeSuccess ? "Subscribed" : "Subscribe" }}
            </button>
            <button
              :disabled="!client.connected"
              type="success"
              size="small"
              class="subscribe-btn"
              style="margin-left: 20px"
              @click="doUnSubscribe"
              v-if="subscribeSuccess"
            >
              Unsubscribe
            </button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">Publish</div>
      <el-form
        ref="publish"
        hide-required-asterisk
        size="small"
        label-position="top"
        :model="publish"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <input v-model="publish.topic" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="payload" label="Payload">
              <input v-model="publish.payload" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="publish.qos">
                <el-option
                  v-for="(item, index) in qosList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24">
        <button
          :disabled="!client.connected"
          type="success"
          size="small"
          class="publish-btn"
          @click="doPublish"
        >
          Publish
        </button>
      </el-col>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">Receive</div>
      <el-col :span="24">
        <input
          type="textarea"
          :rows="3"
          style="margin-bottom: 15px"
          v-model="receiveNews"
        />
      </el-col>
    </el-card>
  </div>
</template>

<script>
import mqtt from "mqtt";

export default {
  name: "MQTT",

  data() {
    return {
      connection: {
        host: "mqtt.pskreporter.info",
        port: 1886,
        endpoint: "/mqtt",
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: "mqttjs_3be2c321",
        rejectUnauthorized: false,
      },
      subscription: {
        topic: "topic/mqttx",
        qos: 0,
      },
      publish: {
        topic: "topic/browser",
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: "",
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    };
  },
  methods: {
    // 创建连接
    createConnection() {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接
      const { host, port, endpoint, ...options } = this.connection;
      const connectUrl = `wss://${host}:${port}${endpoint}`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      this.client.on("connect", () => {
        console.log("Connection succeeded!");
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      this.client.on("message", (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message);
        console.log(`Received message ${message} from topic ${topic}`);
      });
    },
    // 订阅主题
    doSubscribe() {
      const { topic, qos } = this.subscription;
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        this.subscribeSuccess = true;
        console.log("Subscribe to topics res", res);
      });
    },
    // 取消订阅
    doUnSubscribe() {
      const { topic } = this.subscription;
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
        }
      });
    },
    // 发送消息
    doPublish() {
      const { topic, qos, payload } = this.publish;
      this.client.publish(topic, payload, qos, (error) => {
        if (error) {
          console.log("Publish error", error);
        }
      });
    },
    // 断开连接
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end();
          this.client = {
            connected: false,
          };
          console.log("Successfully disconnected!");
        } catch (error) {
          console.log("Disconnect failed", error.toString());
        }
      }
    },
  },
};
</script>

<style lang="scss">
// @import url("../assets/style/home.scss");

.home-container {
  max-width: 1100px;
  margin: 0 auto;

  .conn-btn {
    color: #fff;
    background-color: #00b173;
    font-size: 14px;
  }

  .publish-btn {
    margin-bottom: 20px;
    float: right;
  }

  .button--success {
    background-color: #34c388 !important;
    border-color: #34c388 !important;
    font-size: 14px !important;
  }

  .button--danger {
    background-color: #f5222d !important;
    border-color: #f5222d !important;
  }

  .el-form-item {
    &.is-error {
      .input__inner,
      .el-textarea__inner {
        box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
      }
    }
    &.is-success {
      .input__inner,
      .el-textarea__inner {
        border-color: #34c388 !important;
      }
    }
  }
}
</style> -->
